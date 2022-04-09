import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
ReactModal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}


export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {

  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type
    });
    setTitle('');
    setType('deposit');
    setAmount(0);
    setCategory('');
    onRequestClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input type="text" placeholder="Título" value={title} onChange={event => setTitle(event.target.value)} />
        <input type="number" placeholder="Valor" value={amount} onChange={event => setAmount(Number(event.target.value))} />

        <TransactionTypeContainer>
          <RadioBox isActive={type === 'deposit'} activeColor="green" type="button" onClick={() => { setType('deposit') }}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox isActive={type === 'withdraw'} activeColor="red" type="button" onClick={() => { setType('withdraw') }}>
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input type="text" placeholder="Categoria" value={category} onChange={event => setCategory(event.target.value)} />

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  );
}
