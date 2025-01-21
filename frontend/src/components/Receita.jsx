function Receita() {
  return (
    <>
        <button type="button" class="btn_voltar" id="btn_modal_receita"><i class="bi bi-arrow-left"></i></button>
        <div class="modal-content modal_receita px-4">
            <h3 class="text-center">Receita</h3>
            <a href="./outro-perfil.html" class="d-flex align-items-center">
                <img src="../assets/img_perfil_padrao.svg" alt="" />
                <p class="ms-2">@usuario</p>
            </a>
            <p>Categoria: bolo</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel repudiandae illum nihil culpa, at numquam, minus laborum distinctio, repellendus tempora facere quaerat dolor dolore aperiam voluptatem harum sunt veritatis est. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic quas dolorum repellendus error perferendis minus deserunt perspiciatis est, maiores, nostrum culpa dolorem neque velit recusandae ipsum amet tempore suscipit ipsa. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, magnam. Quisquam laborum corrupti eius deleniti tempore. Nihil nesciunt mollitia, tenetur, cum quis voluptas quo blanditiis saepe adipisci placeat, modi delectus?</p>
        </div>
    </>
  )
}

export default Receita