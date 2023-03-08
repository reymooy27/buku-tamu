import prisma from "@/server/db/client";

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    
    try{
      const data = await prisma.tamu.findMany()

      const months = [
        { name: "Januari", tamu: 0 },
        { name: "Februari", tamu: 0 },
        { name: "Maret", tamu: 0 },
        { name: "April", tamu: 0 },
        { name: "Mei", tamu: 0 },
        { name: "Juni", tamu: 0 },
        { name: "Juli", tamu: 0 },
        { name: "Agustus", tamu: 0 },
        { name: "September", tamu: 0 },
        { name: "Oktober", tamu: 0 },
        { name: "November", tamu: 0 },
        { name: "Desember", tamu: 0 },
      ];
      
      const currentYear = new Date().getFullYear();

      const result = data.reduce((acc, { jamMasuk }) => {
        const year = new Date(jamMasuk).getFullYear();
        if (year === currentYear) {
          const monthIndex = new Date(jamMasuk).getMonth();
          acc[monthIndex].tamu++;
        }
        return acc;
      }, months);

      res.status(200).json(result)
    }catch(err){
      console.log(err)
      res.status(400).json(err)
    }
  } else {
    res.status(404).json('Not Found')
  }
}
