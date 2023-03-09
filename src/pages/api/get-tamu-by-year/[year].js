import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const year = parseInt(req.query.year, 10)


  const start = new Date(year, 0, 1).toISOString()
  const end = new Date(year + 1, 0 , 0, 23, 59, 59, 999).toISOString()

  if (req.method === 'GET') {  
    try{
      const tamu = await prisma.tamu.findMany({
        where:{
          jamMasuk:{
              gt: start,
              lt: end,
          },
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
