
function Portifolio(props){
    return(
        <table width="100%">
            <tr className="tableIndex">
                <td>Nome Acao</td>
                <td>Quantidade</td>
                <td>Valor</td>
            </tr>
            {props.portifolio.map((item) => <AcaoNome click={props.setAcao} item={item}/>)}
        </table>
    );
}

function AcaoNome(props){
    return(
        <tr onClick={() => props.click(props.item.nomeAcao)} className="row">
            <td>{props.item.nomeAcao}</td>
            <td>{props.item.numeroTotalAcao}</td>
            <td>{props.item.precoAcao}</td>
        </tr>
    );
}

export default Portifolio;