import prisma from "@/server/db/client";

export default async function handler(req, res) {
  const input = JSON.parse(req.body)
  if (req.method === 'POST') {
    try{
      await prisma.tamu.create({
        data:{
          nama: input.nama,
          alamat: input.alamat,
          hp: parseInt(input.hp,10),
          jenisKelamin: input.jenisKelamin,
          keterangan: input.keterangan
        }
      })
      res.status(200).send('Berhasil')
    }catch(err){
      console.log(err)
      res.status(400).send(err)
    }
  } else {
    res.status(404).send('Not Found')
  }
}
