export default function handler(req, res) {
  res.status(200).json({ 
    message: "JobBoard API is running",
    status: "OK",
    timestamp: new Date().toISOString()
  });
}
