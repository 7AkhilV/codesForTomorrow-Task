const { Service, ServicePriceOption } = require('../models/service.db'); 

const addService = async (req, res) => {
  try {
    const { name, type, priceOptions } = req.body;

    const createdService = await Service.create({
      categoryId: req.params.categoryId,
      name,
      type,
      priceOptions: priceOptions.map(option => ({
        duration: option.duration,
        price: option.price,
        type: option.type,
      })),
    });

    return res.status(201).json({ message: 'Service added', service: createdService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: { categoryId: req.params.categoryId },
      include: [{ model: ServicePriceOption, as: 'priceOptions' }],
    });

    return res.status(200).json({ message: 'All services', services });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    await Service.destroy({ where: { id: serviceId } });

    return res.status(200).json({ message: 'Deleted the service' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

const updateService = async (req, res) => {
  try {
    const { name, type, priceOptions } = req.body;
    const { serviceId } = req.params;

    const [updatedRowCount, [updatedService]] = await Service.update(
      {
        name,
        type,
        priceOptions: priceOptions.map(option => ({
          duration: option.duration,
          price: option.price,
          type: option.type,
        })),
      },
      { where: { id: serviceId }, returning: true }
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.status(200).json({ message: 'Updated the service', service: updatedService });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

module.exports = { addService, getAllServices, deleteService, updateService };
