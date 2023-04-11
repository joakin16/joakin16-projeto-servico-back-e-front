import "../../App.css";
import "./index.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Table() {
  const [servico, setServico] = useState({
    nomeCliente: "",
    dataInicio: "",
    dataTermino: "",
    descricaoServico: "",
    valorServico: "",
    valorPago: "",
    dataPagamento: "",
  });
  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    buscarTodos();
  }, [atualizar]);

  function goTo(go) {
    navigate(go);
  }
  function buscarTodos() {
    axios.get("http://localhost:8080/api/servico/").then((result) => {
      setServicos(result.data);
    });
  }

  function buscarPagamentosPendente() {
    axios
      .get("http://localhost:8080/api/servico/pagamentoPendente")
      .then((result) => {
        setServicos(result.data);
      });
  }

  function buscarCancelados() {
    axios.get("http://localhost:8080/api/servico/cancelados").then((result) => {
      setServicos(result.data);
    });
  }

  function excluir(id) {
    axios.delete("http://localhost:8080/api/servico/" + id).then((result) => {
      setAtualizar(result);
    });
  }

  function cancelar(id) {
    axios.post("http://localhost:8080/api/servico/" + id).then((result) => {
      setAtualizar(result);
    });
  }

  function editar(
    id,
    nomeCliente,
    dataInicio,
    dataTermino,
    descricaoServico,
    valorServico,
    valorPago,
    dataPagamento
  ) {
    navigate("/");
  }

  return (
    <div className="container">
      <div className="Titulo">
        <button onClick={buscarTodos} type="button" className="btn btn-primary">
          Listar Todos
        </button>
        <button
          onClick={buscarPagamentosPendente}
          type="button"
          className="btn btn-secondary"
        >
          Serviços com pagamento pendente
        </button>
        <button
          onClick={buscarCancelados}
          type="button"
          className="btn btn-success"
        >
          Serviços cancelados
        </button>
        <button
          onClick={() => goTo("/")}
          type="button"
          className="btn btn-warning"
        >
          Voltar
        </button>
      </div>
      <hr /> <hr />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((serv) => (
            <tr key={serv.id}>
              <td>{serv.nomeCliente}</td>
              <td>{serv.descricaoServico}</td>
              <td>{serv.valorServico}</td>
              <td>{serv.status}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Ações
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() =>
                          editar(
                            serv.id,
                            serv.nomeCliente,
                            serv.dataInicio,
                            serv.dataTermino,
                            serv.descricaoServico,
                            serv.valorServico,
                            serv.valorPago,
                            serv.dataPagamento
                          )
                        }
                      >
                        Editar
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => excluir(serv.id)}
                      >
                        Excluir
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => cancelar(serv.id)}
                      >
                        Cancelar
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Table;
