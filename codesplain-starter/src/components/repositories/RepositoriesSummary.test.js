import { screen, render } from '@testing-library/react';
import RepositoriesSummary from "./RepositoriesSummary";


test('displays information about the repository', () => { 
    const repository = {
        language: "JavaScript",
        stargazers_count: 5,
        forks: 30,
        open_issues: 4
    }

    render(<RepositoriesSummary repository={repository}/>);

    for(let key in repository){
        let value = repository[key];
        let element = screen.getByText(new RegExp(value));
        expect(element).toBeInTheDocument();
    }
 })