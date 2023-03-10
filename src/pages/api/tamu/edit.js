import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const {id, input} = JSON.parse(req.body)

  if (req.method === 'PATCH') {  
    try{
      const tamu = await prisma.tamu.update({
        where:{
          id: parseInt(id,10)
        },
        data: input
      })

      res.status(200).json('Berhasil')
    }catch(err){
      throw err
    }
  } else {
    res.status(404).json('Not Found')
  }
}
 