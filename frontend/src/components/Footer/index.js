import './Footer.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='line' />
            <div className='footer-content'>
                <p>All book images are owned by www.barnesandnoble.com.</p>
                <div className='footer-links'>
                    <a target="_blank" href="https://github.com/milner-chen/barnes-nobel/">
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/milner-chen-841330216/">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;