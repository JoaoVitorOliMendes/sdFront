import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "../../features/auth/AuthSlice"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import Card from "../../components/card/Card"

export default function ListProd() {
    let items = [
      {
        name: 'teaasdasda asd asd asdasdsad asdst',
        price: 43.00,
        img: 'https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2020/09/rede-starbucks-peve-perdas-neste-trimestre-foto-divulgacao.jpg'
      },{
        name: 'test',
        price: 43.00,
        img: 'https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2020/09/rede-starbucks-peve-perdas-neste-trimestre-foto-divulgacao.jpg'
      },{
        name: 'test',
        price: 43.00,
        img: 'https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2020/09/rede-starbucks-peve-perdas-neste-trimestre-foto-divulgacao.jpg'
      },{
        name: 'test',
        price: 43.00,
        img: 'https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2020/09/rede-starbucks-peve-perdas-neste-trimestre-foto-divulgacao.jpg'
      },{
        name: 'test',
        price: 43.00,
        img: 'https://alemdofato.uai.com.br/wp-content/uploads/sites/5/2020/09/rede-starbucks-peve-perdas-neste-trimestre-foto-divulgacao.jpg'
      },
    ]

    return (
      <div className="w-full flex justify-center">
        <div className="p-4 grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-3/5 place-content-center ">
          {items.map((val, index) => (
            <Card key={index} name={val.name} price={val.price} img={val.img} />
          ))}
        </div>
      </div>
    )
}