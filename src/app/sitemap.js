export default async function sitemap(){
  return(
    [{
      url:"http://localhost:3000/shop",
      lastModified:new Date()

    },{
      url:"http://localhost:3000",
      lastModified:new Date()
    }]
  )
}