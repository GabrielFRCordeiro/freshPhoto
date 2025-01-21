function Header() {
  return (
    <header>
        <nav class='navbar navegacao fs-1 w-100'>
            <div class="d-flex flex-lg-column justify-content-around justify-content-lg-start w-100 align-items-lg-center">
                <a href="./home.html" class="mt-lg-5"><i class="bi bi-house-door navIcon"></i></a>
                <a href="./seguindo.html" class="mt-lg-4"><i class="bi bi-hand-thumbs-up navIcon"></i></a>
                <a href="#" class="mt-lg-4"><i class="bi bi-person-circle navIcon navIconFocus"></i></a>
            </div>
        </nav>
    </header>
  )
}

export default Header