import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

import styles from './style.module.css';

const Footer = () => {
    return (
       <footer className={styles.footer}>
           <ul className={styles.scoail_list}>
               <li className={styles.scoail_list}><FaFacebook /></li>
               <li className={styles.scoail_list}><FaInstagram /></li>
               <li className={styles.scoail_list}><FaLinkedin /></li>
           </ul>
           <p className={styles.copy_rigth}><span>Costs</span> &copy;2021</p>
       </footer>
    )
}

export default Footer