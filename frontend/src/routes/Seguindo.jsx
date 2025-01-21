import Card from "../components/Card"
import img_teste_1 from "../assets/imgs/img_teste_1.png"
import img_teste_2 from "../assets/imgs/img_teste_2.png"
import img_teste_3 from "../assets/imgs/img_teste_3.png"
import Receita from "../components/Receita"

let fotos = [img_teste_3, img_teste_1, img_teste_2, img_teste_3, img_teste_1, img_teste_2, img_teste_3, img_teste_1, img_teste_2]

function Seguindo() {
  return (
    <>
      <div class="fundo_melancia2" id="parallax"></div>
      <section id="feed_cards" class="feed_cards">
        {fotos.map(foto => (
          <Card post_img={foto} />
        ))}
      </section>
      <section id="modal_receita" class="modal align-items-center">
        <Receita />
      </section>
    </>
  )
}

export default Seguindo