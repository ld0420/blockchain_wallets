import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

export const AddressPage = () => {
    const router = useRouter()
    const [balance, setBalance] = useState([]);
    const [transactions, setTransactions] = useState([])
    const [id, setId] = useState(router.query.id)
    const [isBalanceLoading, setIsBalanceLoading] = useState(true)
    const [isLoadingTransactions, setIsLoadingTransactions] = useState(false)

    useEffect(() => {
        setId(router.query.id)
    }, [router])

    useEffect(() => {
        fetchData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const fetchData = () => {
        if (id) {
            const balanceUrl = `https://blockchain.info/balance?active=${id}`
            const transactionsUrl = `https://blockchain.info/rawaddr/${id}`

            return fetch(balanceUrl).then((response) => {
                    return response.json();
                }).then((data) => {
                    return data;
                })
                .then((values) => setBalance(values[id]))
                .catch((err) => console.log(err))
                .finally(() => setIsBalanceLoading(false))
        }
    }

    const getTransactions = () => {
        const transactionsUrl = `https://blockchain.info/rawaddr/${id}`

        return fetch(transactionsUrl, {
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then((res) => {
                if (!res.ok) {
                    setIsLoadingTransactions(true)
                    console.log('Unable to fetch transactions')
                }
                console.log('response', res)
                return res.json();
            }).then((data) => {
                return data;
            })
            .then((values) => setTransactions(values))
            .catch((err) => console.log(err))
            .finally(() => setIsLoadingTransactions(false))
    }


    return (
         <div className = { styles.container }> 
            {isBalanceLoading && (<div> Still Loading... </div>)} 

            {balance && (
                <div className = { styles.balanceContainer } >
                    <h3 className = { styles.balanceInfo } > Address: { id } </h3> 
                    <div className = { styles.balanceInfo } > Total received: { balance?.total_received } </div> 
                    <div className = { styles.balanceInfo } > Final balance: { balance?.final_balance } </div> 
                </div>
            )} 
            <div> 
                <button onClick = { getTransactions }> See Transactions </button> 
                {isLoadingTransactions && (<div> Sorry, cannot load transactions </div>)} 
                
                {transactions && (<div> show transactions here </div>)} 
            </div>

        </div>
    )
};


export default AddressPage;