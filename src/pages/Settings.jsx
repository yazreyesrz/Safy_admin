import React from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { FaCog, FaSave } from "react-icons/fa";

const Settings = () => {
  return (
    <div className="container">
      <h4 className="mb-4 d-flex align-items-center gap-2">
        Configuración del sistema
      </h4>

      <Card className="p-4 shadow-sm border-0">
        <Form>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="systemName">
                <Form.Label>Nombre del sistema</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: SAFY Admin"
                  defaultValue="SAFY Admin"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="sessionTimeout">
                <Form.Label>Tiempo de cierre de sesión</Form.Label>
                <Form.Select defaultValue="15">
                  <option value="5">5 minutos</option>
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="anonymousReports">
                <Form.Check
                  type="switch"
                  label="Permitir reportes anónimos"
                  defaultChecked
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="verification">
                <Form.Check
                  type="switch"
                  label="Requiere verificación al ingresar"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end">
            <Button variant="primary" type="submit">
              <FaSave className="me-2" />
              Guardar cambios
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
