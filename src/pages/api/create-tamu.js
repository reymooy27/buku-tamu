import prisma from "@/server/db/client";
import {v4} from "uuid"
export default async function handler(req, res) {
  const input = JSON.parse(req.body)
  if (req.method === 'POST') {
    try{

      const tamu = await prisma.tamu.create({
        data:{
          nama: input.nama,
          alamat: input.alamat,
          hp: input.hp,
          jenisKelamin: input.jenisKelamin,
          asalInstansi: input.instansi,
          orangYgDitemui: input.orangYgDitemui,
          keperluan: input.keperluan,
          status: 'Dilayani'
        }
      })

      const sessionToken = v4()
      const expires = new Date(Date.now() + 30 * 60 * 1000)

      const session = await prisma.tamuSession.create({
        data: {
          sessionToken,
          expires,
          tamu: {
            connect: {
              id: tamu.id,
            },
          },
        },
      })

      res.status(200).json({tamu, session})
    }catch(err){
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    res.status(404).json('Not Found')
  }
}
