import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const month = parseInt(req.query.month, 10)

  const thisYear = new Date().getFullYear()
  
  const start = new Date(thisYear, month, 1).toISOString()
  const end = new Date(thisYear, month + 1, 0, 23, 59, 59, 999).toISOString()

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
