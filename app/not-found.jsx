import '../styles/not-found.scss'

export default function NotFound() {
  return (
    <div>
        <div className="mars"></div>
        <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
        <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
        <p className="title">Oh no!!</p>
        <p className="subtitle">
        Tính năng đang trong thời gian phát triển <br /> Hẹn gặp lại bạn trong thời gian ngắn nhất.
        </p>
        <div align="center">
        <a className="btn-back" href="/">Trở về trang chủ</a>
        </div>
        <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
        <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
    </div>
  )
}