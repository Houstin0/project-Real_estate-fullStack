import Card from"../card/Card"

function List({posts}){
  return (
<>
      {posts.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
   </>
  )
}

export default List