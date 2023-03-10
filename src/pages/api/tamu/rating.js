import prisma from "@/server/db/client";

export default async function handler(req, res) {

  const {tamuId, sessionId, rating} = JSON.parse(req.body)
  const jamKeluar = new Date().toISOString()

  if (req.method === 'PATCH') {  
    try{
      const tamu = await prisma.tamu.update({
        where:{
          id: parseInt(tamuId,10)
        },
        data:{
          kepuasan: String(rating),
          jamKeluar,
          status: 'Selesai Dilayani'
        }
      })

      await prisma.tamuSession.delete({
        where:{
          id: parseInt(sessionId,10)
        }
      })

      res.status(200).json('Berhasil')
    }catch(err){
      throw err
    }
  } else {
    res.status(404).json('Not Found')
  }
}
