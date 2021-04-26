import { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";

const ColorPicker = ({number, itemData, bandType, handleBandChange, toggleState}) => {
    if (!itemData) return <div>Loading...</div>

    const [bgColor, setBgColor ] = useState('inherit')
    const [buttonText, setButtonText ] = useState()

    useEffect(() => {
        createTextForButton()
    }, [bgColor])

    useEffect(() => {
        setBgColor('inherit')
    }, [toggleState])
    
    const handleColorChange = e => {
        setBgColor(e.target.outerText)
        handleBandChange(number, e.target.outerText)
    }

    const createTextForButton = () => {
        if( bgColor === 'inherit' ) {
            setButtonText((number === 0 ? `Tolerance` : `Band ${number}`))
        }
        else{
            setButtonText(bgColor)
        }        
    }

    const checkDropdownVisibility = (item) => {
        switch (bandType) {
            case 'significant':
                if(isNaN(item.significantFigures)){
                    return false
                }
                else 
                return true
            case 'multiplier':
                if(isNaN(item.multiplier)){
                    return false
                }
                else 
                return true
            case 'tolerance':
                    if(isNaN(item.percent)){
                        return false
                    }
                    else 
                    return true
        }
    }

    return (  
        <Card>
            <Card.Body>
                <div className="dropdown" style={{ padding: 12, 'borderRadius': '10px', backgroundColor: bgColor}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{width: '100px'}}>
                            { buttonText }
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                itemData.map(item => (
                                  checkDropdownVisibility(item) &&
                                    <Dropdown.Item 
                                        key={item.color} 
                                        onClick={(e) => handleColorChange(e)}
                                    >
                                        {item.color}
                                    </Dropdown.Item>
                                  
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>              
                </div>               
            </Card.Body>
        </Card>
    );
}
 
export default ColorPicker;