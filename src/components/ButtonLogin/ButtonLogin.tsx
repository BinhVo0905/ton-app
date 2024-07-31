import React, { Fragment, useState } from 'react'
import ModalHideAuthor from '../PostActionDropdown/ModalHideAuthor'
import { LockClosedIcon } from '@heroicons/react/24/solid'
import Button from '../Button/Button'
import ModalCategories from '@/app/(archives)/ModalCategories'
import NcModal from '../NcModal/NcModal'
import Input from '../Input/Input'
import { AuthApi } from '@/apis/authApi'
import ModalLogin from '../ModalLogin/ModalLogin'
const ButtonLogin = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleLogin = async() => {
        await AuthApi.login(email, password);
        setIsOpen(false);
        window.location.reload();
    }
    const renderModalContent = () => {
        return (
            <div className="flex flex-col items-center">
                <Input placeholder='Email' className='mb-10' onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin} className="mt-20" pattern="secondary" sizeClass="px-10 py-4">
                    <span>Log In</span>
                </Button>
            </div>

        );
    };
    return (
        <div className="nc-ModalCategories">
            <ModalLogin
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                renderTrigger={(openModal) => (
                    <Button onClick={openModal} className="!hidden md:!flex " pattern="secondary" sizeClass="px-6 py-2">
                        <LockClosedIcon className="me-3 w-6 h-6" />
                        <span>Log In</span>
                    </Button>
                )}
                modalTitle="Log In"
                renderContent={renderModalContent}
            />
        </div>




    )
}

export default ButtonLogin