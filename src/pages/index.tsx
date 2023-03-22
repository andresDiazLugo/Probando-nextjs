import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link';
import PageLayout from '@/componrnyd/PageLayout';

import {useState,useEffect} from 'react'
//vamos importar un coostom hooks que tien nextjs
import {useRouter} from 'next/router'
const inter = Inter({ subsets: ['latin'] })
export default function Home({articles}:any) {
  const router = useRouter();
  const article = articles.slice(0,15)
  return (
    <PageLayout title="index">
      <div className={styles.container}>
          {article?.length === 0 && <p>Loading ...</p>}
          {article?.length > 0 && article.map((article:any) =>(
            
            <article key={article.id}>
              <Image src={article.url} alt={article.id} width={400} height={400}  priority />
              <h2>{article.title}</h2>
            </article>
          ))}
        {/**no es recomendable de navegar de esta forma de manera programatica */}
        {/**tiene mas sentido urilizarlo cuando quieres redirigir al ususario a algun sitio de la pagina cuando haya cargado un formulario */}
        <button onClick={()=> router.push('/article/2')}>    
          Navegar de forma programatica a un articulo
        </button>
      </div>
    </PageLayout>
  )
}
/**esta peticion la hace una vez se ejecuta en buil time o para refresca la pagina  */
export async function getStaticProps(){
  const response:any = await fetch("https://jsonplaceholder.typicode.com/photos")
  const article = await response.json()
  return{
    props:{
      articles:article
    }
  }
}
/**este metodo se ejecuta en el servidor... */
//tienes que escribir la funcion de esta manera y retornar un objecto con una propiedad objecto
// export async function getServerSideProps(){
//   const response:any = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2023-02-21&sortBy=publishedAt&apiKey=83e79d8f9de14209b622af5f53d8b8db")
//   const {articles} = await response.json()
//   return{
//     props:{
//       article:articles
//     }
//   }
// }
