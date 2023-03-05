import prisma from "@/server/db/client";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const input = JSON.parse(req.body)
  const saltRounds = 10
  if (req.method === 'POST') {
    const password = await bcrypt.hash(input.password, saltRounds);
    try{
      await prisma.user.create({
        data:{
          username: input.username,
          password: password
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
