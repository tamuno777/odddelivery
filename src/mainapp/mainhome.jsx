import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function mainhome() {
  return (
    <div className='' style={{overflow:"hidden"}}>
      <marquee behavior="scroll" direction="right">
      <lord-icon
                    src="https://cdn.lordicon.com/jyijxczt.json"
                    trigger="loop"
                    delay = "0"
                    colors="primary:#3a3347,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#646e78"
                    style={{"width":"100px","height":"100px"}}>
                </lord-icon>
      </marquee>
      <Row className="pt-2 " style={{overflow:"hidden"}}>
        <Col sm={5} className='py-5 ps-5 '>
          <h1>DELIVERY <br /> SERVICE </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat rerum sapiente officia numquam deleniti qui exercitationem. Officiis laboriosam nisi saepe voluptas asperiores, qui reiciendis inventore ut cum quia facere? Nesciunt.</p>

          <button className='firstbtn'>KNOW MORE</button>
        </Col>
        <Col sm={7}  className='service'>

        </Col>
      </Row>
    </div>
  )
}
