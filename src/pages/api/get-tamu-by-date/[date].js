import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const date = req.query.date
  
  if (req.method === 'GET') {  
    try{
      const tamu = await prisma.tamu.findMany({
        where:{
          jamMasuk:{
              gt: `${date}T00:00:00.000Z`,
              lt: `${date}T23:59:59.999Z`,
          }
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
