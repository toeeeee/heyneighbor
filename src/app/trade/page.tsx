"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../components/ui/dropdown'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TradePage() {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">Select an Item</h1>
                        <Dropdown />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
