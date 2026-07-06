import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // API Route to generate Midtrans Snap Token
  app.post("/api/midtrans/token", async (req, res) => {
    try {
      const { orderId, grossAmount, customerDetails, itemDetails } = req.body;

      if (!orderId || !grossAmount) {
        return res.status(400).json({ 
          error: "orderId and grossAmount are required fields" 
        });
      }

      // Read Midtrans server key from env
      const serverKey = process.env.MIDTRANS_SERVER_KEY;
      const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
      
      // If server key is not configured, we can run in mock/simulation mode or use a default sandbox key
      if (!serverKey) {
        console.warn("⚠️ [MIDTRANS] MIDTRANS_SERVER_KEY is not defined in environment variables. Running in Simulation mode.");
        
        // Return a mock token for development testing so the UI runs flawlessly
        const mockToken = `mock-snap-token-${Math.random().toString(36).substr(2, 9)}`;
        return res.json({
          token: mockToken,
          redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${mockToken}`,
          isMock: true,
          message: "Midtrans Server Key is missing. Using fully functional simulated payment mode."
        });
      }

      // Determine Midtrans API URL
      const midtransApiUrl = isProduction
        ? "https://app.midtrans.com/snap/v1/transactions"
        : "https://app.sandbox.midtrans.com/snap/v1/transactions";

      // Build Midtrans request payload
      const payload = {
        transaction_details: {
          order_id: orderId,
          gross_amount: Math.round(grossAmount),
        },
        customer_details: {
          first_name: customerDetails?.name || "Customer",
          email: customerDetails?.email || "customer@example.com",
          phone: customerDetails?.phone || "08123456789",
        },
        item_details: itemDetails || [
          {
            id: "TOUR_BOOKING",
            price: Math.round(grossAmount),
            quantity: 1,
            name: "Wisanggeni Tour Booking",
          }
        ],
        credit_card: {
          secure: true,
        }
      };

      // Base64 authorization header: Basic Base64(ServerKey + ":")
      const authHeader = `Basic ${Buffer.from(serverKey + ":").toString("base64")}`;

      // Call Midtrans Snap API
      const response = await fetch(midtransApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": authHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🔴 [MIDTRANS API ERROR]", errorText);
        return res.status(response.status).json({ 
          error: "Failed to create Midtrans transaction",
          details: errorText 
        });
      }

      const data = await response.json();
      return res.json({
        token: data.token,
        redirect_url: data.redirect_url,
        isMock: false
      });

    } catch (err: any) {
      console.error("🔴 [SERVER ERROR /api/midtrans/token]", err);
      return res.status(500).json({ 
        error: "Internal Server Error", 
        message: err.message 
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
