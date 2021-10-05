import {AiFillCheckCircle, AiFillSetting} from 'react-icons/ai'
import { BiUserPin} from 'react-icons/bi'
import { HiOutlineDocumentReport} from 'react-icons/hi'

import './topbar.scss'
const Topbar = ({setActiveSetting, activeSetting}) => {

    return (
        <div className="Topbar">
            <div className="left">
                <a href=""><AiFillCheckCircle color='white' size='20' />Pomodoro Timer Clone</a>
            </div>

            <div className="right">
                <button className="report-button" >
                    <HiOutlineDocumentReport size='20'/>
                    <div className="report-button-name">Report</div>
                </button>
                <button className="setting-button" onClick={() => setActiveSetting(!activeSetting)}>
                    <AiFillSetting size='20'/>
                    <div className="setting-button-name">Setting</div>
                </button>
                <button className="login-button">
                    <BiUserPin size='20'/>
                    <div className="login-button-name">Login</div>
                </button>
            </div>

        </div>
    )
}

export default Topbar
