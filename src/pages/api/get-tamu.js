import prisma from "@/server/db/client";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try{
      const tamu = await prisma.tamu.findMany({})
      res.status(200).json(tamu)
    }catch(err){
      res.status(400).json(err)
    }
  } else {
    res.status(404).json('Not Found')
  }
}
