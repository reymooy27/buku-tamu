import prisma from "@/server/db/client";

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const {id} = JSON.parse(req.body)
    try{
      const tamu = await prisma.tamu.delete({
        where: {
          id:id
        }
      })
      res.status(200).json('Berhasil')
    }catch(err){
      res.status(400).json(err)
    }
  } else {
    res.status(404).json('Not Found')
  }
}
