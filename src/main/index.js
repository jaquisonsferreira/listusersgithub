import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../services/api';

import Container from '../components/Container';
import { Form, SubmitButton, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // carrega os dados do localstorange
  componentDidMount() {
    const respositories = localStorage.getItem('respositories');
    console.log(respositories);

    if (respositories) {
      this.setState({ repositories: JSON.parse(respositories) });
    }
  }

  // atualizar os dados do localstorange
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.respositories !== repositories) {
      console.log('atualizou');
      localStorage.setItem('respositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({
      newRepo: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar respositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus size={14} color="#FFF" />
              )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repo) => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/respository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
