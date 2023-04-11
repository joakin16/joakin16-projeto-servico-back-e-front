import "./Servico.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Servico() {
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

  function goTo(go) {
    navigate(go);
  }

  useEffect(() => {
    buscarTodos();
  }, [atualizar]);

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
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

  function limpar() {
    setServico({
      nomeCliente: "",
      dataInicio: "",
      dataTermino: "",
      descricaoServico: "",
      valorServico: "",
      valorPago: "",
      dataPagamento: "",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (servico.id === undefined) {
      axios
        .post("http://localhost:8080/api/servico/", servico)
        .then((result) => {
          setAtualizar(result);
        });
    } else {
      axios
        .put("http://localhost:8080/api/servico/", servico)
        .then((result) => {
          setAtualizar(result);
        });
    }
    limpar();
  }

  return (
    <div className="container">
      <h1>Cadastro de Serviços</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-6">
          <div>
            <label className="form-label">Nome do Cliente</label>
            <input
              value={servico.nomeCliente || ""}
              name="nomeCliente"
              type="text"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Data de início</label>
            <input
              value={servico.dataInicio || ""}
              name="dataInicio"
              type="date"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Data de Término</label>
            <input
              value={servico.dataTermino || ""}
              name="dataTermino"
              type="date"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Descrição do serviço</label>
            <input
              value={servico.descricaoServico || ""}
              name="descricaoServico"
              type="text"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Valor serviço</label>
            <input
              value={servico.valorServico || ""}
              name="valorServico"
              type="number"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Valor pago</label>
            <input
              value={servico.valorPago || ""}
              name="valorPago"
              type="number"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label className="form-label">Data de pagamento</label>
            <input
              valor={servico.dataPagamento || ""}
              name="dataPagamento"
              type="date"
              className="form-control"
              onChange={handleChange}
            ></input>
          </div>
          <br />
          <input
            type="submit"
            value="Cadastrar"
            className="btn btn-success"
          ></input>
          &nbsp;&nbsp;
          <button
            onClick={() => goTo("/table")}
            type="button"
            className="btn btn-primary"
          >
            Listar todos
          </button>
        </div>
      </form>
      {/* <table className="table table-striped">
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
                {serv.status !== "cancelado" && (
                  <button
                    onClick={() => setServico(serv)}
                    className="btn btn-primary"
                  >
                    Alterar
                  </button>
                )}
                &nbsp;&nbsp;
                {serv.status !== "cancelado" && (
                  <button
                    onClick={() => excluir(serv.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                )}
                &nbsp;&nbsp;
                <button
                  onClick={() => cancelar(serv.id)}
                  className="btn btn-warning"
                >
                  Cancelar
                </button>
                &nbsp;&nbsp;
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default Servico;
