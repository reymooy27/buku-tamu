export default function Head() {
  return (
    <>
      <title>Dashboard</title>
      <link rel="preload" href="/api/get-tamu-all-count" as="fetch" crossOrigin="anonymous"></link>
      <link rel="preload" href="/api/get-tamu-by-date-count" as="fetch" crossOrigin="anonymous"></link>
      <link rel="preload" href="/api/get-tamu-by-month-count" as="fetch" crossOrigin="anonymous"></link>
      <link rel="preload" href="/api/get-tamu-by-year-count" as="fetch" crossOrigin="anonymous"></link>
      <link rel="preload" href="/api/get-monthly-count" as="fetch" crossOrigin="anonymous"></link>
    </>
  )
}
