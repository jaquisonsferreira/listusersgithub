import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pty from 'prop-types';
import api from '../services/api';

import Container from '../components/Container';
import { Loading, Owner, IssueList } from './styles';

class Repository extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    match: pty.shape({
      params: pty.shape({
        repositorio: pty.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repositorio);

    const [repositorio, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repositorio.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos Repositórios</Link>
          <img src={repository.owner.avatar_url} alt="repositorio" />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          {issues.map((i) => (
            <li key={String(i.id)}>
              <img src={i.user.avatar_url} alt={i.user.login} />
              <div>
                <strong>
                  <a href={i.html_url}>{i.title}</a>
                  {i.labels.map((label) => (
                    <span key={String(label.id)}> {label.name}</span>
                  ))}
                </strong>
                <p> {i.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
