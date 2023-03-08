import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const id = parseInt(req.query.sessionId, 10)

  if (req.method === 'GET') {  
    try{
      const tamu = await prisma.tamuSession.findUnique({
        where:{
          id: id
        },
      })
      res.status(200).json(tamu)
    }catch(err){
      throw err
    }
  } else {
    res.status(404).json('Not Found')
  }
}
