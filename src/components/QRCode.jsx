import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import logo from '../assets/images/logo.png'
export default function QRCode(props) {
    return (
        <div>
            <>
                <QRCodeSVG
                    onClick={() => {
                        window.print()
                    }}
                    value={window.location.origin + '/mview/' +props.data}
                    size={props.qrsize * 4 || 250}
                    level="L"
                    imageSettings={{
                        src: logo,
                        x: undefined,
                        y: undefined,
                        height: props.imagesize || 30,
                        width: props.imagesize || 30,
                        excavate: true
                    }}
                />
            </>
        </div>
    )
}
