import Head from 'next/head'
import React, {useState} from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home() {
    const address1 = "12xQ9k5ousS8MqNsMBqHKtjAtCuKezm2Ju";
    const address2 = "1MDUoxL1bGvMxhuoDYx6i11ePytECAk9QK"
    const [newAddressInput, setNewAddressInput] = useState('')
    const [addresses, setAddresses] = useState([address1, address2])

    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleAddressInput = (e) => {
        setNewAddressInput(e.target.value)
    }

    const handleAddingNewAddress = () => {
        const copyAddresses = [...addresses];
        copyAddresses.push(newAddressInput);
        setNewAddressInput('')
        setAddresses(copyAddresses)
    }

    const handleDeleteAddress = (address) => {
        const copyAddresses = [...addresses];
        const filteredAddresses = copyAddresses.filter((id) => id === address)
        setAddresses(filteredAddresses)
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>Wallet addresses</title>
                <meta name="description" content="Cointracker wallet addresses" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                Welcome to Wallet addresses
                </h1>

                <div className={styles.mainContainer}>
                    {addresses.map((address) => {
                        return (
                            <div key={address} className={styles.cardContainer}>
                                <div className={styles.card}>
                                    <a href={`/address/${address}`} type="button">
                                        {address}
                                    </a>
                                </div>
                                <button className={styles.deleteAddressBtn} onClick={() => handleDeleteAddress(address)}>Delete address</button>
                            </div> 
                        )
                    })}

                    <form onSubmit={handleSubmit} className={styles.newAddressInputForm}>
                        <label>Add a new address</label>
                            <input type="text" className={styles.newAddressInput} onChange={handleAddressInput}/>
                        <button className={styles.newAddressBtn} onClick={handleAddingNewAddress}>Add</button>

                    </form>
            
                </div>
            </main>

        </div>
    )
}
