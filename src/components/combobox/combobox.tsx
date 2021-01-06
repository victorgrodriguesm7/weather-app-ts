import React, { forwardRef, useCallback, useEffect, useState, InputHTMLAttributes} from 'react';
import "./combobox.css";
interface ComboBoxProps extends InputHTMLAttributes<HTMLInputElement>{
    options: Array<string>;
}

const ComboBox: React.ForwardRefRenderFunction<HTMLInputElement, ComboBoxProps> = ({options = [""], ...rest}: ComboBoxProps, ref: any) =>{
    const maxOptions = 5;
    let [input, setInput] = useState("");
    let [possibleOptions, setPossibleOptions] = useState(Array<string>());
    
    const autoComplete = useCallback(() => {
        setPossibleOptions( 
            options.filter(
                (value: string) =>((
                    value.toLowerCase().match(input.toLowerCase())?.index ?? true
                ) <= 0) && (value !== input)
            )
        );        
    }, [input, options])

    useEffect(() => {
        if (input){
            autoComplete();
        }else{
            setPossibleOptions(options);
        }

    }, [input,options, autoComplete])
    
    return (
        <div className="combo-box">
            <input 
                ref={ref} 
                type="text" 
                {...rest}
                autoCorrect="false"
                onChange={e => setInput(e.target.value)}/>
            <div className="options">
                {
                    possibleOptions.length ?  
                        <ul>
                        {
                            possibleOptions.map((item: string, index: number) => {
                                if (index >= maxOptions){
                                    return null;
                                }
                                return (
                                    <li key={item} onClick={e => {ref.current.value = item; setInput(ref.current.value)}}> 
                                        <p>{item}</p>  
                                        <hr/>
                                    </li>
                                );
                            })
                        }
                    </ul> : null
                }
            </div>
        </div>
    );
}

export default forwardRef(ComboBox);