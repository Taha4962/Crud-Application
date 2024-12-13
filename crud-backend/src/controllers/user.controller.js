import * as clientService from "../sevices/user.services.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    return res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;

    // Check if a client with the given email already exists
    const existingClient = await clientService.findClientByEmail(
      clientData.email
    );
    if (existingClient) {
      return res
        .status(400)
        .json({ message: "Client with this email already exists" });
    }

    const newClient = await clientService.createClient(clientData);
    return res.status(201).json(newClient);
  } catch (err) {
    console.error("Error adding client:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const clientData = req.body;

    const updatedClient = await clientService.updateClient(
      clientId,
      clientData
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json(updatedClient);
  } catch (err) {
    console.error("Error updating client:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const success = await clientService.deleteClient(clientId);
    if (!success) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error("Error deleting client:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const clients = await clientService.searchClients(searchTerm);
    return res.status(200).json(clients);
  } catch (err) {
    console.error("Error searching clients:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
