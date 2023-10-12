import MainSlider from '../MainSlider/MainSlider'
import Products from '../Products/Products'
import axios from 'axios'
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';



function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,top:"100%",left:"51%" ,backgroundColor:"#d6d6d6",borderRadius:"10px",transform: "translateX(-50%)" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, top:"100%",left:"49%",backgroundColor:"#d6d6d6",borderRadius:"10px" ,transform: "translateX(-50%)" }}
      onClick={onClick}
    />
  );
}






const Home = () => {
  
  var settings = {
    infinite: true,
    slidesToShow: 6,
    swipeToSlide: true,
    speed: 500,
    pauseOnHover: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

let {isLoading,data} = useQuery('categories', getCategories)
  
function getCategories() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
  


  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <div className='layout'>
      {!isLoading ? <div className="container">
      <MainSlider />
      {!isLoading ? <div className='mb-5'>
                <Slider {...settings}>
                    {data?.data.data.map((category) => {
                        return <div key={category._id}>
                                <div className=' text-decoration-none text-dark'>
                                    <img height={250} className='w-100' src={category.image} alt="" />
                                    <h5 className=' fw-bolder text-center py-1'>{category.name}</h5>
                                </div>

                            </div>
                    })}
                </Slider>

            </div> : <div className='py-5 my-5 text-center'>
                <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
            </div>}
      <div className="container layout">
       
        <Products/>
      </div>
      </div>
        : <div className=' position-fixed vh-100 vw-100 bg-black bg-opacity-50 text-center d-flex justify-content-center align-items-center'>
                <i className="fa-solid fa-spinner fa-spin fa-3x text-white"></i>
            </div>}
          </div>
        
   

    </>
  )
}

export default Home