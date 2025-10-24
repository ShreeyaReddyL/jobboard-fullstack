export default function handler(req, res) {
  res.status(200).json({ 
    success: true,
    message: "Simple endpoint working",
    timestamp: new Date().toISOString()
  });
}
