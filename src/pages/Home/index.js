import styles from './style.module.css';
import imagem from '../../img/savings.svg'
import LinkButton from '../../components/LinkButton/'

const Home = () => {
    return (
        <section className={styles.home_container}>
            <h1 className={styles.home_container_h1}>Bem-vindo ao <span className={styles.home_container_span}>Costs</span></h1>
            <LinkButton to='/newproject' text='Criar Projeto' />
            <p className={styles.home_container_p}>Comece a gerenciar seus projetos agora mesmo!</p>
            <img src={imagem} alt='Costs' className={styles.home_container_img} />
        </section>
    )
}

export default Home