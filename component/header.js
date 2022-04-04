import Img from '../public/opendatabayern.svg';
import Image from "next/image"


export default function Header() {
    return (
        <div>
            <div className="account-masthead">
                <div className="container">

                    <nav className="account not-authed" aria-label="Benutzerkonto">
                        <ul className="list-unstyled">

                            <li><a href="http://opendatabayern.de/user/login">Anmeldung</a></li>

                            <li><a className="sub" href="http://opendatabayern.de/user/register"><strong>Registrieren</strong></a></li>


                        </ul>
                    </nav>

                </div>
            </div>

            <header className="navbar navbar-static-top masthead">

                <div className="container">
                    <div className="navbar-right">
                        <button data-target="#main-navigation-toggle" data-toggle="collapse" className="navbar-toggle collapsed" type="button" aria-label="expand or collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="fa fa-bars"></span>
                        </button>
                    </div>
                    <hgroup className="header-image navbar-left">

                        <a className="logo" href="http://opendatabayern.de"><Image src={Img} alt="Open Data Bayern" title="Open Data Bayern" /></a>

                    </hgroup>

                    <div className="collapse navbar-collapse" id="main-navigation-toggle">

                        <nav className="section navigation">
                            <ul className="nav nav-pills">

                                <li className="active"><a href="http://opendatabayern.de">Startseite</a></li><li><a href="http://opendatabayern.de/dataset/">Daten entdecken</a></li><li><a href="http://opendatabayern.de/about">ber Uns</a></li>

                            </ul>
                        </nav>

                        <form className="section site-search simple-input" action="http://opendatabayern.de/dataset/" method="get">
                            <div className="field bayern-search-field">
                                <label htmlFor="field-sitewide-search">Datensatz-Suche</label>
                                <input id="field-sitewide-search" type="text" className="form-control nav-search" name="q" placeholder="Suche" aria-label="Datensatz-Suche" />
                                <button className="btn-search" type="submit" aria-label="Absenden"><i className="fa fa-search"></i></button>
                            </div>
                        </form>

                    </div>
                </div>
            </header>
        </div>
    )
}