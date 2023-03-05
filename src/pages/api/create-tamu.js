import prisma from "@/server/db/client";

export default async function handler(req, res) {
  const input = JSON.parse(req.body)
  if (req.method === 'POST') {
    try{
      await prisma.tamu.create({
        data:{
          nama: input.nama,
          alamat: input.alamat,
          hp: input.hp,
          jenisKelamin: input.jenisKelamin,
          asalInstansi: input.instansi,
          keperluan: input.keperluan
        }
      })
      res.status(200).json('Berhasil')
    }catch(err){
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    res.status(404).json('Not Found')
  }
}
