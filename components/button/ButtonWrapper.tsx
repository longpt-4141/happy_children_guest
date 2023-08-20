import React from 'react'
import { FolderTwoTone } from '@ant-design/icons';

type Props = {
    link : string
}

const ButtonWrapper = ({link}: Props) => {
  return (
    <a href={link} target="_blank" className="button--link flex items-center justify-center text-red-50" rel="noreferrer" >
            {/* <Button 
                type="primary" 
                icon={<EyeTwoTone twoToneColor='#fff' />}
            > */}   
                    <FolderTwoTone  />
                    {/* Bấm vào để xem */}
            {/* </Button> */}
        </a>
    );
}

export default ButtonWrapper