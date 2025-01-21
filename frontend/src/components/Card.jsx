function Card({post_img}) {
  return (
    <div class="feed_card d-flex justify-content-center" role="button">
        <div class="d-flex align-items-center post_receita">
            <img src={post_img} alt="" class="lazy" />
        </div>
    </div>
  )
}

export default Card