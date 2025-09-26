import aroundLogo from '@assets/logo.svg';
import lineHeader from '@assets/line-header.svg';

function Header() {
  return (
    <header className="header page__header">
      <img
        className="img-logo header__img-logo"
        src={aroundLogo}
        alt="Logotipo: 'Around The U.S.'. Around é escrito maior e The U.S. está
          posicionado como um expoente, em tamamnho bem menor."
      />
      <img
        className="img-line header__img-line"
        src={lineHeader}
        alt="Linha de divisão inferior do bloco header."
      />
    </header>
  );
}

export default Header;
